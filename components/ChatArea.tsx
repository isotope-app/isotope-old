import { useContacts } from "../hooks/zustand";

export default function ChatArea() {
  const selectedContacts = useContacts((state) => state.selected)

  if (!selectedContacts) return (
    <div>
      <h3 className="text-center m-4 text-2xl font-medium">Welcome to Isotope.</h3>
      <p className="text-center">Add or select a person in your contacts to start talking.</p>
    </div>
  )

  return (
    <div className="h-full">
      <h3 className="text-2xl font-medium">{selectedContacts}</h3>
      <hr className="m-2" />
    </div>
  );
}