import { Button } from "@mui/material";

export default function ExportToCsv({ gridRef }) {

    const exportToCsv = () => {
        if (gridRef.current) {
            gridRef.current.api.exportDataAsCsv({
                filename: "customers.csv",
                onlySelected: false,
                allColumns: false,
                columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"],
            });
        }
    };

    return(
        <>
        <Button size="small" variant="outlined" onClick={exportToCsv} color="secondary" style={{ margin: "10px 0", float: "right" }}>
            Export to CSV
        </Button>
        </>
    )
}