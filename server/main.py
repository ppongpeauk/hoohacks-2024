# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import asyncio

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
