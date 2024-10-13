export const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center py-4 px-6 border-t bg-gray-100">
      {/* Company logo with accessible alt text */}
      <div className="flex  items-center space-x-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/digimart-removebg-new-edit.png?alt=media&token=614d5a77-e41e-4ed3-9340-7b679f3a9d4d"
          className="w-8 h-8 object-cover"
          alt="Digimart Logo"
        />
        <span className="text-sm font-medium">Digimart</span>
      </div>
      
      {/* Footer Text */}
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Digimart. All rights reserved.
      </p>
    </footer>
  );
};
