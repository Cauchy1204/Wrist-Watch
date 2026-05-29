import { Page } from "@/components/layout/Page";
import { RecordFlow } from "@/components/record/RecordFlow";

export default function RecordPage() {
  return (
    <Page withNav={false}>
      <RecordFlow />
    </Page>
  );
}
