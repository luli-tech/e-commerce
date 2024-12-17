
import { Puff } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Puff
                visible={true}
                height="80"
                width="80"
                color="lavender"
                ariaLabel="puff-loading"
            />
        </div>
    );
}
export default Loader;