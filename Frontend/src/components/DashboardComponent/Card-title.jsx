const CardTitle = ({Title, Text, Icon, Number }) => {
    return (
      <div className="max-w-64 aspect-square mx-auto bg-white rounded-xl border overflow-hidden flex p-1 ">
        <div className="flex flex-col items-center justify-between ">

            <div className="px-7 py-5 text-center">
                <h2 className="text-lg font-bold text-gray-800 text-center">{Title}</h2>
                <i>icon</i>
            </div>
            <div className="px-7 py-5 text-left items-end"> 
                <p>{"$"+Number}</p>
                <p className="text-gray-600">{Text}</p>
            </div>

        </div>
      
    
        
      </div>
    );
  };
  
  export default CardTitle;