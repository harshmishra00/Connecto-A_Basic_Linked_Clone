import PostList from "../components/PostList";



const Home = () => {
  return (
    <div className="bg-gray-900">


      <div className="border border-white w-1/2 justify-self-center h-20 bg-white flex items-center justify-center rounded-b-3xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">Connecto</span>
        </h1>
      </div>

      <main className="container mx-auto px-4 md:px-8 py-10">
        <div className=" shadow-md rounded-2xl p-6 md:p-8 ">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center text-center space-x-2 justify-center">
            <span className="">Latest Posts</span>
          </h2>
          <PostList />
        </div>
      </main>
    </div>
  );
};

export default Home;
