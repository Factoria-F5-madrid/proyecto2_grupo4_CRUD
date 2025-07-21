import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/medicalHistory/medical_history/"; // Cambia esta URL si tu endpoint de videos es diferente

//Obtener los historiales médicos
export const getMedicalHistories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a los historiales médicos:", error);
    throw error;
  }
};

// Obtener la lista de los historiales médicos
export const getListMedicalHistories = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las lista de los historiales médicos ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo video
export const createVideo = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/videos",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el video:", error);
    throw error; 
  }
};

// Eliminar un video por ID
export const deleteVideo = async (id) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el video con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un video por ID
export const updateVideo = async (id, updatedData) => {
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el video con ID ${id}:`, error);
    throw error;
  }
};




@router.get("/list")
async def list_medical_histories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MedicalHistory))
    histories = result.scalars().all()
    return histories

@router.post("/")
async def create_medical_history(history: MedicalHistoryCreate, db: AsyncSession = Depends(get_db)):
    new_history = MedicalHistory(
        #pet_id=history.pet_id,
        type=history.type,
        description=history.description
    )
    db.add(new_history)
    await db.commit()
    await db.refresh(new_history)
    return new_history