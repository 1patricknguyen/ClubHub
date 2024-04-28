from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from os import environ


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = 'pideltapsiinc'
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id,'username': self.username, 'password': self.password}

#--------------------------------CREATING DUMMY DATA-------------------------------------------------------------------------------------
def create_users():
    db.create_all()  # Ensure all tables are created
    initialize_users()  # Initialize with dummy data

def initialize_users():
    users = [
        {"username": "patricknguyen", "password": "pn"},
        {"username": "christiannguyen", "password": "cn"},
        {"username": "justinoh", "password": "jo"},
        {"username": "johndinh", "password": "jd"},
        {"username": "anhle", "password": "al"}
    ]

    for user_data in users:
        existing_user = User.query.filter_by(username=user_data["username"]).first()
        if not existing_user:
            hashed_password = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
            new_user = User(username=user_data["username"], password=hashed_password)
            db.session.add(new_user)
    db.session.commit()

create_users()
#----------------------------------------------------------------------------------------------------------------------------------------

@app.route('/test/', methods=['GET'])
def test():
    return jsonify({'message': 'The server is running'})


@app.route('/login/', methods=['POST'])
def login_user():
    username = request.json["username"]
    password = request.json["password"]
    if not username or not password:
        return jsonify({'error': 'Please provide both username and password'}), 400
    
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # The password matches
        return jsonify({'message': 'Login successful'}), 200
    else:
        # Username not found or password does not match
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/api/flask/users/', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        new_user = User(username=data['username'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            'id': new_user.id,
            'username': new_user.username,
            'password': new_user.password,
        }), 201
    except Exception as e:
        return make_response(jsonify({'message': 'error creating user', 'error': str(e)}), 500)

# get all users
@app.route('/api/flask/users/', methods=['GET'])
def get_users():
   try:
       users = User.query.all()
       users_data = [{'id': user.id, 'username': user.username, 'password': user.password} for user in users]
       return jsonify(users_data), 200
   except Exception as e:
       return make_response(jsonify({'message': 'error getting users', 'error': str(e)}), 500)
   
@app.route('/api/flask/users/<id>/', methods=['GET'])
def get_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(jsonify({'user': user.json()}), 200)
        return make_response(jsonify({'message': "user not found"}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting user', 'error': str(e)}), 500)
    
@app.route('/api/flask/users/<id>/', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.username = data['username']
            user.password = data['password']
            db.session.commit()
            return make_response(jsonify({'message': 'user updated'}, 200))
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error updating user', 'error': str(e)}), 500)
    
@app.route('/api/flask/users/<id>/', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({'message': 'user deleted'}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error deleting user', 'error': str(e)}), 500)