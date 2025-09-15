import os
import requests

from fastapi import FastAPI,Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from dotenv import load_dotenv

from app.db import engine,get_db,User
from app.model import Token,UserCreate
from app.login_token import get_password_hash,create_access_token,get_user,authenticate_user,get_current_user

from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
load_dotenv()


app = FastAPI()

@app.get("/")
async def root():
    # Base.metadata.create_all(engine)
    return "Hello Saurabh"



@app.get("/price/{symbol}")
def get_price(symbol: str, currency: str = "usd",current_user: User = Depends(get_current_user)):
    """
    Get live price of a cryptocurrency
    Example: /price/bitcoin?currency=usd
    """

    bearer_token = os.getenv("bearer_token")
    # get_symbol = 
    FREE_CRYPTO_URL = "https://api.freecryptoapi.com/v1/" + 'getData?symbol={}'.format(symbol)

    headers = {"Authorization": f"Bearer {bearer_token}"}

    try:
        response = requests.get(
            FREE_CRYPTO_URL,
            headers=headers
        )
        print(response)
        data = response.json()
        return data
    except Exception as e:
        return {"error": str(e)}



@app.post("/register", response_model=Token)
def register(user: UserCreate, db : Session = Depends(get_db)):
    db_user = get_user(db,user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(email = user.email,hashed_password=hashed_password,name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message" : "Hello {}, Your Profile Created Succefully".format(user.name)}


@app.post("/login",response_model=Token)
def login(form_data :OAuth2PasswordRequestForm = Depends(),db:Session = Depends(get_db)):
    email = form_data.username
    user = authenticate_user(db,email,form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Wrong Email or Password")
    access_token = create_access_token(data={"sub": email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return {"email": current_user.email}

