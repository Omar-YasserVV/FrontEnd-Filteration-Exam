import { FileText } from "lucide-react";

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-200 p-6 rounded-full mb-4 text-gray-500">
        <FileText size={48} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
