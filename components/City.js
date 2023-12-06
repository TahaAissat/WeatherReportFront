import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRotateRight, faStar} from '@fortawesome/free-solid-svg-icons'

function City() {
    return (
      <div class="flex flex-col w-64 h-72 justify-center items-center bg-slate-50 rounded-2xl m-5">
        <span class='flex flex-row w-full justify-between p-2'>
          <FontAwesomeIcon icon={faRotateRight} />
          <FontAwesomeIcon icon={faStar} />
        </span>
        <div class='font-sans text-2xl'>Paris</div>
        <div class="p-2">
          <Image src="/Clear.png" width={150} height={150} />
        </div>
        <div>
          <div>Clear</div>
          <div>7° - 24°</div>
        </div>
      </div>
    );
}

export default City