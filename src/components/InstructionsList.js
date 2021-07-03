import StepCard from "./StepCard/StepCard"


const InstructionsList = (props) => {
    const instructions = props.instructions
    console.log(instructions)
    return (
        <div className="container mx-auto bg-purple-200 bg-opacity-20 p-6 rounded-xl w-auto m-6">
            {<h1><b>Instructions:</b></h1> }
            { instructions.filter(item => item !== "").map((item, index) => (
                <StepCard key = {index} step = {item} />
            ))}
        </div>
    )
}

export default InstructionsList

