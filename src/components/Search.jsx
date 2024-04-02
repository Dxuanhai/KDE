export default function Search() {
  return (
    <div className="w-full">
      <h2 className="font-bold text-3xl mb-4">User</h2>

      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
          <label htmlFor="id-input" className="text-black">
            ID
          </label>
          <input
            type="text"
            id="id-input"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Search by Id..."
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
          <label htmlFor="email-input" className="text-black">
            Email
          </label>
          <input
            type="text"
            id="email-input"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Search by Email..."
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
          <label htmlFor="select-input" className="text-black">
            Select
          </label>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            <option value="option1">xếp theo ngày tạo trễ nhất</option>
            <option value="option2">tên A - Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
