
/*

 similar to authors but require an image.


import { storage } from 'src/utils/firebase'
import { ref, getDownloadURL } from 'firebase/storage'

const DirectoryNode = (props) => {
  const { node } = props;
  const { loading, error, data } = useReadingProject('react-notes');

  const dispatch = useDispatch();
  const path ='images/jatwing-avatar.png'
  const imageRef = ref(storage, path);
  getDownloadURL(imageRef).then(
    url => {
      console.log(url)
    }
  ).catch(error => {
    console.log(error)
  })


  useEffect(() => {
 
 */
