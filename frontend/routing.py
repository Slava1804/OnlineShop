from flask import render_template, Flask, redirect, url_for, session, request, abort, g
import sqlite3
import os

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
  return render_template('main.html', header_style='white-text', menu=[])

@app.teardown_appcontext
def close_db(error):
  if hasattr(g, 'link_db'):
    g.link_db.close()

@app.route('/registration', methods=['POST', 'GET'])
def registration():
  if 'userLogged' in session:
    return redirect(url_for('profile', username=session['userLogged']))
  elif request.method == 'POST' and request.form['email'] == 'slava@mail.ru' and request.form['psw'] == 'psw':
    session['userLogged'] = request.form['email']
    return redirect(url_for('profile', username=session['userLogged']))

  return render_template('registration.html')

@app.route('/catalog')
def catalog():
  db = get_db()
  cursor = db.execute('SELECT id, title, price, imageurl FROM catalog')
  products = cursor.fetchall()
  return render_template('catalog.html', products=products)

@app.route('/basket')
def basket():
  return render_template('basket.html')


@app.route('/product')
def product():
  return render_template('product.html')

@app.route('/profile/<username>')
def profile(username):
  if 'userLogged' not in session or session['userLogged'] != username:
    abort(401)

  return render_template('profile.html')

if __name__ == '__main__':
  app.run(host='localhost', port=4200, debug=True)
