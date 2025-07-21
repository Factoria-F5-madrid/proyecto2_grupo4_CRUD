import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/invoices/"; 

// Acceder a las facturas
export const getInvoices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al acceder a las facturas:", error);
    throw error;
  }
};

// Obtener la lista de facturas
export const getInvoicesList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la lista de facturas:`, error);
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
async def list_invoices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Invoice))
    Invoice = result.scalars().all()
    return Invoice

@router.post("/")
async def create_invoice(invoice: InvoiceCreate, db: AsyncSession = Depends(get_db)):
    new_invoice = Invoice(
        service_id=invoice.service_id,
        payment_id=invoice.payment_id,
        tax_identification_number=invoice.tax_identification_number,
        discounts=invoice.discounts,
        additional_price=invoice.additional_price,
        vat=invoice.vat,
        included_service=invoice.included_service,
        completed=invoice.completed
    )
    db.add(new_invoice)
    await db.commit()
    await db.refresh(new_invoice)
    return new_invoice

@router.put("/")
async def update_invoice(db: AsyncSession = Depends(get_db)):
    return await invoice_controller.update_invoice(db, invoice_id=id, invoice=invoice_schema())

@router.delete("/")
async def delete_pets(db: AsyncSession = Depends(get_db)):
    return await invoice_controller.delete_invoice(db, invoice_id=id)