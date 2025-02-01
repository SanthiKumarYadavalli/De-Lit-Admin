import BannerForm from "@/components/form/BannerForm";
import { getData } from "@/services/api";

export default async function Page() {
  const bannerData = await getData("get_banner");
  return (
    <BannerForm bannerData={bannerData} />
  )
}