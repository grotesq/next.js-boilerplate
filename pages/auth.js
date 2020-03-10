import withAuth from '../components/hoc/withAuth';

let Page = () => <>Auth</>;

Page = withAuth(Page);

export default Page;
