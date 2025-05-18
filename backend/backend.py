from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
from gradio_client import Client, handle_file
import tempfile
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
# Configure upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize the Hunyuan3D client
hunyuan3d_client = Client("tencent/Hunyuan3D-2")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/generate3d', methods=['POST'])
def generate_3d():
    # Check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400
    
    file = request.files['image']
    

    # If user does not select file, browser might submit an empty file
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Create a secure filename
        filename = secure_filename(file.filename)
        # Add a UUID to ensure uniqueness
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        # Save the file
        file.save(filepath)
        
        try:
            # Use the default parameters from the original example
            # Call the 3D generation API
            result = hunyuan3d_client.predict(
                caption=None,
                image=handle_file(filepath),
                mv_image_front=None,
                mv_image_back=None,
                mv_image_left=None, 
                mv_image_right=None,
                steps=30,
                guidance_scale=5,
                seed=1234,
                octree_resolution=256,
                check_box_rembg=True,
                num_chunks=8000,
                randomize_seed=True,
                api_name="/shape_generation"
            )
            
            # Result should be the path to the generated GLB file
            if isinstance(result, tuple) and isinstance(result[0], dict) and 'value' in result[0]:
                glb_path = result[0]['value']
            else:
                return jsonify({'error': 'Unexpected response format from model'}), 500

            if os.path.exists(glb_path):
                return send_file(glb_path, as_attachment=True, download_name=f"model_{unique_filename.split('.')[0]}.glb")
            else:
                return jsonify({'error': 'Model generation failed'}), 500
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            # Clean up the uploaded file
            if os.path.exists(filepath):
                os.remove(filepath)
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)