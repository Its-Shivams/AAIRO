import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="infinity-wrapper">
            <InfinitySpin
                visible={true}
                width="200"
                color="var(--aairo-orange)"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    );
};

export default Loader;