import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function AdminCMSPage() {
  return <StudioClient />;
}
