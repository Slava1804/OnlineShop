from flask import *

app = Flask(__name__)

@app.route('/')
def main():
  return render_template('main.html')

@app.route('/catalog')
def catalog():
  return render_template('catalog.html')

@app.route('/basket')
def basket():
  return render_template('basket.html')

@app.route('/item')
def item():
  return render_template('item.html')

if __name__ == '__main__':
  app.run(host='localhost', port=4200)
