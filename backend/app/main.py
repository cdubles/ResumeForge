from fastapi import FastAPI

app = FastAPI(title="Resume Forge")

@app.get("/health")
def health_check():
    return {"status": "ok"}