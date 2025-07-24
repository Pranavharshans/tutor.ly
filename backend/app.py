from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import uuid
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
OUTPUT_DIR = "static"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/render")
async def render(request: Request):
    logger.info("=== RENDER ENDPOINT HIT ===")
    
    try:
        data = await request.json()
        logger.info(f"Received data keys: {list(data.keys()) if data else 'None'}")
        
        script = data.get("script")
        if not script:
            logger.error("No script provided in request")
            return JSONResponse({"error": "No script provided"}, status_code=400)

        logger.info(f"Script length: {len(script)} characters")
        logger.info(f"Script preview: {script[:200]}...")

        # Save script to file
        script_id = str(uuid.uuid4())
        script_path = f"/tmp/{script_id}.py"
        
        logger.info(f"Saving script to: {script_path}")
        with open(script_path, "w") as f:
            f.write(script)

        # Run Manim
        output_file = f"{script_id}.mp4"
        logger.info(f"Running Manim to generate: {output_file}")
        
        try:
            result = subprocess.run([
                "manim", script_path, "VideoScene",
                "-o", output_file, "-qk", "--disable_caching"
            ], check=True, capture_output=True, text=True, cwd="/tmp")
            
            logger.info("Manim completed successfully")
            logger.info(f"Manim stdout: {result.stdout}")
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Manim failed with return code {e.returncode}")
            logger.error(f"Manim stderr: {e.stderr}")
            logger.error(f"Manim stdout: {e.stdout}")
            return JSONResponse({"error": f"Manim execution failed: {e.stderr}"}, status_code=500)

        # Find the generated video file - Manim creates a complex directory structure
        # Look in common Manim output locations
        script_name = os.path.splitext(os.path.basename(script_path))[0]  # Get filename without extension
        possible_paths = [
            f"/private/tmp/media/videos/{script_name}/2160p60/{output_file}",
            f"/private/tmp/media/videos/{script_name}/1080p60/{output_file}",
            f"/private/tmp/media/videos/{script_name}/720p60/{output_file}",
            f"/private/tmp/media/videos/{script_name}/480p60/{output_file}",
            f"/tmp/media/videos/{script_name}/2160p60/{output_file}",
            f"/tmp/media/videos/{script_name}/1080p60/{output_file}",
            f"/tmp/media/videos/{script_name}/720p60/{output_file}",
            f"/tmp/media/videos/{script_name}/480p60/{output_file}",
            f"media/videos/{script_name}/2160p60/{output_file}",
            f"media/videos/{script_name}/1080p60/{output_file}",
            f"media/videos/{script_name}/720p60/{output_file}",
            f"media/videos/{script_name}/480p60/{output_file}",
            f"media/videos/{output_file}",
            f"/tmp/{output_file}",
            output_file
        ]
        
        src_path = None
        for path in possible_paths:
            logger.info(f"Checking for video at: {path}")
            if os.path.exists(path):
                src_path = path
                logger.info(f"Found video at: {src_path}")
                break
        
        if src_path is None:
            logger.error("Video not found at any expected location")
            # List contents of tmp and media directories for debugging
            for debug_dir in ["/tmp", "media", "/tmp/media"]:
                if os.path.exists(debug_dir):
                    logger.info(f"Contents of {debug_dir}: {os.listdir(debug_dir)}")
                    # If it's a media directory, check subdirectories
                    if "media" in debug_dir:
                        try:
                            for item in os.listdir(debug_dir):
                                item_path = os.path.join(debug_dir, item)
                                if os.path.isdir(item_path):
                                    logger.info(f"Contents of {item_path}: {os.listdir(item_path)}")
                        except Exception as e:
                            logger.error(f"Error listing {debug_dir}: {e}")
            return JSONResponse({"error": "Video not found after rendering"}, status_code=500)

        # Move video to static dir
        dst_path = os.path.join(OUTPUT_DIR, output_file)
        logger.info(f"Moving video from {src_path} to: {dst_path}")
        
        try:
            import shutil
            shutil.copy2(src_path, dst_path)
            logger.info("Video copied successfully")
        except Exception as e:
            logger.error(f"Failed to copy video: {e}")
            return JSONResponse({"error": f"Failed to copy video: {e}"}, status_code=500)

        # Return public URL
        video_url = f"/static/{output_file}"
        logger.info(f"Returning video URL: {video_url}")
        return {"videoUrl": video_url}
        
    except Exception as e:
        logger.error(f"Unexpected error in render endpoint: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return JSONResponse({"error": f"Internal server error: {str(e)}"}, status_code=500)

@app.get("/static/{filename}")
async def get_video(filename: str):
    logger.info(f"=== STATIC FILE REQUEST: {filename} ===")
    file_path = os.path.join(OUTPUT_DIR, filename)
    
    if os.path.exists(file_path):
        logger.info(f"Serving file: {file_path}")
        return FileResponse(file_path, media_type="video/mp4")
    
    logger.error(f"File not found: {file_path}")
    return JSONResponse({"error": "File not found"}, status_code=404)

@app.get("/")
async def root():
    return {"message": "Manim Render Server is running!"}