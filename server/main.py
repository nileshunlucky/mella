from fastapi import FastAPI, HTTPException, Body, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel, EmailStr
from db import users_collection, mella_collection
from api.lemon_webhook import router as lemon_webhook_router

app = FastAPI()

# Allow CORS for your frontend (update this with your Next.js domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add routers
app.include_router(lemon_webhook_router)

# Get user by email
@app.get("/user/{email}")
def get_user(email: str):
    user = users_collection.find_one({"email": email})
    if user:
        user["_id"] = str(user["_id"])
        return user
    raise HTTPException(status_code=404, detail="User not found")

# Get mella
@app.get("/mella")
def get_mella():
    mella = mella_collection.find_one({})
    if mella:
        mella["_id"] = str(mella["_id"])
        return mella
    raise HTTPException(status_code=404, detail="Mella not found")


@app.api_route("/health", methods=["GET", "HEAD"])
async def health_check():
    return {"status": "OK"}

class UserReferral(BaseModel):
    email: EmailStr   

@app.post("/add-user")
def save_referral(data: UserReferral = Body(...)):

    # 1. Check if user exists with email
    user = users_collection.find_one({"email": data.email})

    if user:
         return {"message": "User already exists"}

    # 3. If user doesn't exist, insert as new user
    user_data = {
        "email": data.email,
        "subscribed": False,
    }
    users_collection.insert_one(user_data)
    return {"message": "User added successfully"}