from flask import Flask, request
from flask_cors import CORS, cross_origin

from constants import USERS, ORGANIZATIONS

app = Flask(__name__)
CORS(app, support_credentials=True)

def find_user(id: int) -> dict | None: 
    for user in USERS:
        if user['id']  == id:
            return user

@app.get('/user')
@cross_origin(supports_credentials=True)
def user_list():
    users = USERS
    for key, value in request.args.to_dict().items():
        if key == 'search':
            users = list(filter(
                lambda item: value in item['username'],
                users
            ))
        elif key == 'organization':
            users = list(filter(
                lambda item: (
                    item.get('organization')
                    and str(value) == str(item['organization']['id'])
                ),
                users
            ))
        elif key in ('lastLogin', 'updated'):
            users = list(filter(
                lambda item: value in item.get(key, ''),
                users
            ))
        elif key == 'isActive':
            users = list(filter(
                lambda item: bool(value) == bool(item.get(key)),
                users
            ))
    return users

@app.get('/user/<int:id>')
@cross_origin(supports_credentials=True)
def user_detail(id: int):
    return find_user(id)

@app.get('/user/current')
@cross_origin(supports_credentials=True)
def user_current():
    return USERS[0]

@app.put('/user/<int:id>/block')
@cross_origin(supports_credentials=True)
def block_user(id: int):
    user = find_user(id)
    user['isActive'] = False
    return user

@app.put('/user/<int:id>/unblock')
@cross_origin(supports_credentials=True)
def unblock_user(id: int):
    user = find_user(id)
    user['isActive'] = True
    return user

@app.post('/user/create')
@cross_origin(supports_credentials=True)
def user_create():
    user = request.get_json()
    user['id'] = len(USERS) + 1
    USERS.append(user)
    return user

@app.get('/organization')
@cross_origin(supports_credentials=True)
def organization_list():
    return ORGANIZATIONS

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
