import Card from "./Card/Card"


const InstructionsList = (props) => {
    const instructions = props.instructions
    //console.log(instructions)
    return (
        <div className="container mx-auto bg-gradient-to-br from-white to-purple-50 bg-clip-padding bg-opacity-80 border border-gray-200 backdrop-filter-blur p-6 rounded-xl w-4/6 m-6">
            {<h1><b>Instructions:</b></h1> }
            { instructions.filter(item => item !== "").map((item, index) => (
                <Card id={index} element={item} />
            ))}
        </div>
    )
}

export default InstructionsList

