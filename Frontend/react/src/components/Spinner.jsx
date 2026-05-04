import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '100px auto'
};

const Spinner = ({ loading }) => {
  if (!loading) return null;
  return (
    <ClipLoader
      color="#4338ca"
      loading={true} 
      cssOverride={override}
      size={150}
      speedMultiplier={0.33}
    />
  );
};

export default Spinner;
