from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from os import environ
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = 'pideltapsiinc'
jwt = JWTManager(app)
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(80), nullable=False)
    dues = db.Column(db.String(80))

    def json(self):
        return {'id': self.id,'username': self.username, 'password': self.password}

#--------------------------------CREATING DUMMY DATA-------------------------------------------------------------------------------------
def create_users():
    db.create_all()  # Ensure all tables are created
    initialize_users()  # Initialize with dummy data

def initialize_users():
    users = [
        {"username": "patricknguyen", "password": "pn", "role": "developer", "dues": "0"},
        {"username": "christiannguyen", "password": "cn", "role": "member", "dues": "0"},
        {"username": "justinoh", "password": "jo", "role": "member", "dues": "0"},
        {"username": "johndinh", "password": "jd", "role": "member", "dues": "0"},
        {"username": "anhle", "password": "al", "role": "member", "dues": "0"},
        {"username": "jeffreylopez", "password": "jl", "role": "member", "dues": "0"},
        {"username": "ansonwu", "password": "aw", "role": "member", "dues": "0"},
        {"username": "joeyspagnoli", "password": "js", "role": "member", "dues": "0"},
        {"username": "jasondinh", "password": "jd", "role": "member", "dues": "0"},
        {"username": "koriverges", "password": "kv", "role": "member", "dues": "0"},
        {"username": "andrewhuang", "password": "ah", "role": "member", "dues": "0"},
        {"username": "jameschen", "password": "jc", "role": "member", "dues": "0"},
        {"username": "patrickiteghie", "password": "pi", "role": "member", "dues": "0"},
        {"username": "ivanzhang", "password": "iz", "role": "member", "dues": "0"},
        {"username": "anandhakresnadi", "password": "ak", "role": "member", "dues": "0"},
        {"username": "winsonzhang", "password": "wz", "role": "member", "dues": "0"},
        {"username": "dylanchuang", "password": "dc", "role": "member", "dues": "0"},
        {"username": "danielcho", "password": "dc", "role": "member", "dues": "0"},
        {"username": "arangain", "password": "ag", "role": "member", "dues": "0"},
        {"username": "mikeygatmaitan", "password": "mg", "role": "member", "dues": "0"},
        {"username": "henrybui", "password": "hb", "role": "member", "dues": "0"},
        {"username": "baole", "password": "bl", "role": "member", "dues": "0"},
        {"username": "dustinnguyen", "password": "dn", "role": "member", "dues": "0"},
        {"username": "alanchau", "password": "ac", "role": "member", "dues": "0"},
        {"username": "ryanmatulin", "password": "rm", "role": "member", "dues": "0"},
        {"username": "keithbanate", "password": "kb", "role": "member", "dues": "0"},
        {"username": "jacobpena", "password": "jp", "role": "member", "dues": "0"},
        {"username": "ericoh", "password": "eo", "role": "member", "dues": "0"},
        {"username": "raymondchau", "password": "rc", "role": "member", "dues": "0"},
        {"username": "bryanngo", "password": "bn", "role": "member", "dues": "0"},
        {"username": "vietho", "password": "vh", "role": "member", "dues": "0"},
        {"username": "timothyshin", "password": "ts", "role": "member", "dues": "0"},
        {"username": "vikramkarkare", "password": "vk", "role": "member", "dues": "0"},
        {"username": "lanceopina", "password": "lo", "role": "member", "dues": "0"},
        {"username": "jacobpatag", "password": "jp", "role": "member", "dues": "0"},
        {"username": "earthcapungan", "password": "ec", "role": "member", "dues": "0"},
        {"username": "leonmungin", "password": "lm", "role": "member", "dues": "0"},
        {"username": "kobevu", "password": "kv", "role": "member", "dues": "0"},
        {"username": "peterlok", "password": "pl", "role": "member", "dues": "0"},
        {"username": "aaronjoshy", "password": "aj", "role": "member", "dues": "0"},
    ]

    for user_data in users:
        existing_user = User.query.filter_by(username=user_data["username"]).first()
        if not existing_user:
            hashed_password = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
            new_user = User(username=user_data["username"], password=hashed_password, role=user_data["role"])
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
        additional_claims = {"role": user.role}
        access_token = create_access_token(identity=username, additional_claims=additional_claims)
        return jsonify(access_token=access_token), 200
    else:
        # Username not found or password does not match
        return jsonify({'error': 'Invalid username or password'}), 401
    


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    if user:
        return jsonify(logged_in_as=current_user, role=user.role), 200
    else:
        return jsonify({"message": "User not found"}), 404


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
       users_data = [{'id': user.id, 'username': user.username, 'password': user.password, 'role': user.role, 'dues': user.dues} for user in users]
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
            # user.username = data['username']
            # user.password = data['password']
            user.role = data['role']
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
    

@app.route('/api/flask/users/dues/<id>/', methods=['PUT'])
def update_dues(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.dues = data['dues']
            db.session.commit()
            return make_response(jsonify({'message': 'dues updated'}, 200))
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error updating dues', 'error': str(e)}), 500)