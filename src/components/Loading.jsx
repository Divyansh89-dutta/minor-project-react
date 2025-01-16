import loader from "/loader.gif";
const Loading = () => {
    return (
        <div className="w-[100%] h-[100%] flex justify-center items-center bg-black">
            <img
                className="h-[50%] object-cover"
                 src={loader}
                alt="Loading..."
            />
        </div>
    );
};

export default Loading; 
