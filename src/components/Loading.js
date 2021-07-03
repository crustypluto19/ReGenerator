import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";


const override = css`
  display: block;
  margin: 2 auto;
  border-color: purple;
`;

const Loading = () => {
    return (
        <div className="container mx-auto flex flex-col content-end justify-center w-52">
            <h3 className="text-purple-900 leading-tight mb-3">Generating recipe...</h3>
            <PacmanLoader color="#9561e2" css={override} size={30} />
        </div>
    )
}

export default Loading

