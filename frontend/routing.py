from flask import render_template, Flask, redirect, url_for, session, request, abort, g, jsonify
import sqlite3
import os
import re

DATABASE = '/tmp/OnlineShop.db'
DEBUG = True
SECRET_KEY = 'hkknm42nlklk65nkl32n'

app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(DATABASE=os.path.join(app.root_path, 'OnlineShop.db')))

def connect_db():
  conn = sqlite3.connect(app.config['DATABASE'])
  conn.row_factory = sqlite3.Row
  return conn

def create_db():
  db = connect_db()
  with app.open_resource('sq_db.sql', mode='r') as f:
    db.cursor().executescript(f.read())
  db.commit()
  db.close()

def get_db():
  if not hasattr(g, 'link_db'):
    g.link_db = connect_db()
  return g.link_db

@app.route('/')
def main():
  db = get_db()
  cursor = db.execute('SELECT id, title, price, imageurl FROM catalog LIMIT 4')
  products = cursor.fetchall()
  return render_template('main.html', header_style='white-text', menu=[], products=products)


@app.teardown_appcontext
def close_db(error):
  if hasattr(g, 'link_db'):
    g.link_db.close()

@app.route('/registration', methods=['POST', 'GET'])
def registration():
    if request.method == 'POST':
        name = request.form['name']
        surname = request.form['surname']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        if not name or not surname or not email or not password or not confirm_password:
            return render_template('registration.html', error="Пожалуйста, заполните все поля")
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return render_template('registration.html', error="Некорректный формат электронной почты")



        if password != confirm_password:
            return render_template('registration.html', error="Пароли не совпадают")

        db = get_db()
        cursor = db.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()

        if user:
            return redirect(url_for('registration'))
        else:
            db.execute('INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
                       (name, surname, email, password))
            db.commit()
            session['userLogged'] = email
            return redirect(url_for('profile', username=session['userLogged']))

    return render_template('registration.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if 'userLogged' in session:
        return redirect(url_for('profile', username=session['userLogged']))
    elif request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        db = get_db()
        cursor = db.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
        user = cursor.fetchone()

        if user:
            session['userLogged'] = email
            return redirect(url_for('profile', username=session['userLogged']))
        else:
            return render_template('registration.html', error="Неверный email или пароль")

    return render_template('profile.html')


@app.route('/catalog')
def catalog():
  db = get_db()
  cursor = db.execute('SELECT id, title, price, imageurl FROM catalog')
  products = cursor.fetchall()
  return render_template('catalog.html', products=products)

@app.route('/basket')
def basket():
  return render_template('basket.html', cart=cart)


@app.route('/product')
def product():
  return render_template('product.html')

@app.route('/about')
def about():
  return render_template('about.html')


from flask import render_template, session, abort

@app.route('/profile/<username>')
def profile(username):
    if 'userLogged' not in session or session['userLogged'] != username:
        abort(401)

    # Получаем имя пользователя из сессии
    user_email = session['userLogged']

    # Подключаемся к базе данных
    db = get_db()
    cursor = db.execute('SELECT name, surname, email FROM users WHERE email = ?', (user_email,))
    user_data = cursor.fetchone()

    # Проверяем, найден ли пользователь в базе данных
    if user_data:
        # Распаковываем данные пользователя
        name = user_data['name']
        surname = user_data['surname']
        email = user_data['email']

        # Передаем данные в шаблон для отображения
        return render_template('profile.html', name=name, surname=surname, email=email)
    else:
        # Если пользователь не найден, возвращаем ошибку
        return render_template('error.html', message='Пользователь не найден')

cart = {}

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    if request.method == 'POST':
        # Получаем ID товара, который пользователь добавил в корзину
        product_id = request.form['product_id']

        # Проверяем, есть ли уже такой товар в корзине
        if product_id in cart:
            # Если товар уже есть в корзине, удаляем его из корзины
            del cart[product_id]
            # Возвращаем JSON-ответ с сообщением об успешном удалении товара из корзины
            return jsonify({'message': 'Товар успешно удален из корзины'})
        else:
            # Если товара еще нет в корзине, добавляем его в корзину
            cart[product_id] = 1
            # Возвращаем JSON-ответ с сообщением об успешном добавлении товара в корзину
            return jsonify({'message': 'Товар успешно добавлен в корзину'})



@app.route('/get_product_info', methods=['POST'])
def get_product_info():
    data = request.json
    product_id = data.get('product_id')

    if product_id:
        db = get_db()
        cursor = db.execute('SELECT title, price, imageurl FROM catalog WHERE id = ?', (product_id,))
        product_info = cursor.fetchone()

        if product_info:
            product_data = {
                'title': product_info['title'],
                'price': product_info['price'],
                'imageurl': product_info['imageurl']
            }
            return jsonify(product_data)
        else:
            return jsonify({'error': 'Product not found'}), 404
    else:
        return jsonify({'error': 'Product ID is missing'}), 400

@app.route('/logout')
def logout():
    session.pop('userLogged', None)
    return redirect(url_for('main'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
  app.run(host='localhost', port=4200, debug=True)
