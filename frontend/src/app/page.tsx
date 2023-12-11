import { RetailerMenu } from "@/components/retailerMenu/retailerMenu"; 
import { GetAllRetailers } from "@/app/api/GetAllRetailers";  
import { AffiliatesGroups } from "@/components/affiliatesGroups/affiliatesGroup";
import { PageClient } from "./pageClient";  
import { ListAffiliates } from "./api/ListAffiliates";
import { AffiliateProps, RetailerProps } from "@/context/dataContext";

export default async function App() {
  const retailers = await GetAllRetailers() as RetailerProps[]  
  const affiliates = await ListAffiliates() as AffiliateProps[]
  
  
  return (
    <PageClient
      affiliates={affiliates}
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