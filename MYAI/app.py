from flask import Flask, jsonify, render_template
import cv2
import mediapipe as mp
import threading

# Import the required components
from feature_extraction import *
from strings import *
from model import ASLClassificationModel
from config import MODEL_NAME, MODEL_CONFIDENCE

app = Flask(__name__)

# Initialize MediaPipe
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh
mp_hands = mp.solutions.hands

# Initialize the model
model = ASLClassificationModel.load_model(f"models/{MODEL_NAME}")
expression_handler = ExpressionHandler()

def start_recognition():
    cap = cv2.VideoCapture(0)
    face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1,
                                       refine_landmarks=True,
                                       min_detection_confidence=MODEL_CONFIDENCE,
                                       min_tracking_confidence=MODEL_CONFIDENCE)
    hands = mp_hands.Hands(max_num_hands=2,
                           min_detection_confidence=MODEL_CONFIDENCE,
                           min_tracking_confidence=MODEL_CONFIDENCE)

    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Skip empty camera frames.")
            break

        image.flags.writeable = False
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Image processing
        face_results = face_mesh.process(image)
        hand_results = hands.process(image)

        # Extract features
        feature = extract_features(mp_hands, face_results, hand_results)
        expression = model.predict(feature)
        expression_handler.receive(expression)

        # Draw points on the face
        if face_results.multi_face_landmarks:
            for face_landmarks in face_results.multi_face_landmarks:
                mp_drawing.draw_landmarks(
                    image=image,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_TESSELATION,
                    landmark_drawing_spec=None,
                    connection_drawing_spec=mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=1, circle_radius=1)
                )

        # Draw points on the hand
        if hand_results.multi_hand_landmarks:
            for hand_landmarks in hand_results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    image=image,
                    landmark_list=hand_landmarks,
                    connections=mp_hands.HAND_CONNECTIONS,
                    landmark_drawing_spec=mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=2),
                    connection_drawing_spec=mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2)
                )

        # Reconvert image to display
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        cv2.putText(image, expression_handler.get_message(), (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.imshow('Webcam Feed', image)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

@app.route('/')
def index():
    return render_template('ai.html')

@app.route('/start_recognition', methods=['POST'])
def start_recognition_route():
    threading.Thread(target=start_recognition).start()
    return jsonify({"message": "Identification has begun"}), 200


if __name__ == "__main__":
    app.run(debug=True)