import StepCard from "./StepCard/StepCard"


const InstructionsList = (props) => {
    const instructions = props.instructions
    // const isLoading = props.isLoading
    
    return (
        <div>
            { /*TODO: loading message*/}
            { /*isLoading && <div> Generating recipe... </div> */}
            { instructions.filter(item => item !== "/n").map(item => (
                <StepCard key = {item} step = {item} />
            ))}
        </div>
    )
}

export default InstructionsList

