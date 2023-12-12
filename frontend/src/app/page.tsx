import { ServerGetAllRetailers } from "@/app/api/GetAllRetailers/ServerGetAllRetailers";  
import { PageClient } from "./pageClient"; 
import { RetailerProps } from "@/context/apiDataContext";

export default async function App() {
  const retailers = await ServerGetAllRetailers() as RetailerProps[]   
   
  return (
    <PageClient 
      retailers={retailers}
    />
  );
}
/* 
 
<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>

*/