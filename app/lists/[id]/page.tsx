import ListViewClient from "@/components/ListViewClient";

type PageProps = {
    params: Promise<{ id: string }>;
  };
  
  export default async function ListViewPage({ params }: PageProps) {
    const { id } = await params;


    
    return (
      <main>
        <ListViewClient id={id} />
      </main>
    );
  }