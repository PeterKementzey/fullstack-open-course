#!/usr/bin/env -S uv run --script

# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "fastapi",
#     "uvicorn[standard]",
# ]
# ///


### A mock server that returns error codes for testing purposes ###
### run with `uv run --script mock-server.py` ###

from fastapi import FastAPI, Response
import uvicorn

app = FastAPI()


@app.get("/persons")
def get_persons():
    return Response(status_code=418)

@app.post("/persons")
def create_person():
    return Response(status_code=500)


if __name__ == "__main__":
    uvicorn.run("mock-server:app", host="0.0.0.0", port=3001, reload=False)
