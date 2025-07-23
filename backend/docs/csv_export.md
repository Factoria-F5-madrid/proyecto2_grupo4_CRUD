# CSV Export Documentation

## Overview

This module provides CSV export functionality for all entities in the system.

## Installation

```bash
pip install pandas>=2.0.0
```

## Available Endpoints

### Specific Entity Exports

- `GET /export/users/csv` - Export users
- `GET /export/pets/csv` - Export pets  
- `GET /export/reservations/csv` - Export reservations
- `GET /export/services/csv` - Export services
- `GET /export/employees/csv` - Export employees
- `GET /export/invoices/csv` - Export invoices
- `GET /export/payments/csv` - Export payments

### Generic Export

- `GET /export/all/csv?entity={entity}` - Export any entity

## Usage Examples

### Export all users
```bash
curl -X GET "http://localhost:8000/export/users/csv" --output users.csv
```

### Export pets for specific user
```bash
curl -X GET "http://localhost:8000/export/pets/csv?user_id=1" --output pets_user_1.csv
```

### Export confirmed reservations
```bash
curl -X GET "http://localhost:8000/export/reservations/csv?status=confirmed" --output confirmed_reservations.csv
```

### Use generic export
```bash
curl -X GET "http://localhost:8000/export/all/csv?entity=services" --output services.csv
```

## Available Filters

| Entity | Filters |
|--------|---------|
| Users | `user_id`, `email` |
| Pets | `pet_id`, `user_id` |
| Reservations | `reservation_id`, `user_id`, `status` |
| Services | `service_id`, `service_type` |
| Employees | `employee_id`, `position` |
| Invoices | `invoice_id`, `user_id` |
| Payments | `payment_id`, `invoice_id` |

## Python Usage

```python
import requests

# Export users
response = requests.get("http://localhost:8000/export/users/csv")
with open("users.csv", "wb") as f:
    f.write(response.content)

# Export with filters
response = requests.get(
    "http://localhost:8000/export/pets/csv",
    params={"user_id": 1}
)
with open("pets_user_1.csv", "wb") as f:
    f.write(response.content)
```

## Testing

Run the test script to verify functionality:

```bash
cd backend/examples
python test_csv_export.py
```

## Architecture

- `CSVExportService` - Core export functionality
- `ExportController` - Business logic handling
- `export_routes.py` - HTTP endpoints
- `test_csv_export.py` - Test script

## Error Handling

The system provides proper error handling for:
- Database connection issues
- Invalid entity names
- Missing data
- Export failures

## Performance Considerations

- CSV files are streamed for large datasets
- UTF-8 encoding is used for international characters
- Date fields are converted to ISO format
- Memory usage is optimized for large exports 