from flask import *

app = Flask(__name__)

@app.route('/')
def main():
  return render_template('main.html', header_style='white-text')

@app.route('/catalog')
def catalog():
  return render_template('catalog.html')

@app.route('/basket')
def basket():
  return render_template('basket.html')

@app.route('/favorite')
def favorite():
  return render_template('favorite.html')

@app.route('/product')
def product():
  return render_template('product.html')

@app.route('/footer')
def footer():
  return render_template('footer.html')

if __name__ == '__main__':
  app.run(host='localhost', port=4200)
