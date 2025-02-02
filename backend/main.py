from typing import Union

from fastapi import FastAPI
from constants import USERS, ORGANIZATIONS

app = FastAPI()


@app.get('/user')
def read_item():
    return USERS

@app.get('/user/{id}')
def read_item(item_id: int):
    return filter(USERS, lambda item: item['id'] == item_id)[0]

@app.get('/user/current')
def read_item():
    return USERS[0]

@app.get('/organization')
def read_item():
    return ORGANIZATIONS
