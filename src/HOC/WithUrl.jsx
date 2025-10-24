import { useParams } from 'react-router';
export default function WithUrl(Component) {
   let ComponentWithUrlData = (props) => {
      const params = useParams();
      return <Component {...props} params={params} />;
   };
   return ComponentWithUrlData;
}
