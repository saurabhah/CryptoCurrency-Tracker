from sqlalchemy import create_engine,MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,engine,Integer,String,Table
metadata_obj = MetaData()

DB_URL= 'sqlite:///./users.db'
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True,index=True)
    name = Column(String(100))
    email = Column(String, unique=True,index=True)
    hashed_password = Column(String)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

