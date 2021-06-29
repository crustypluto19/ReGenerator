import StepCard from "./StepCard/StepCard"


const InstructionsList = (props) => {
    const instructions = props.instructions
    const isLoading = props.isLoading
    
    return (
        <div className="container mx-auto bg-purple-50 p-6 rounded-xl w-auto m-6">
            { /*TODO: loading message*/}
            { instructions.filter(item => item !== "\n").map(item => (
                <StepCard key = {item} step = {item} />
            ))}
        </div>
    )
}

export default InstructionsList

