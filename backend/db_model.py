from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,engine,Integer,String,Table
from app.db import metadata_obj
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True,index=True)
    name = Column(String(100))
    email = Column(String, unique=True,index=True)
    hashed_password = Column(String)

