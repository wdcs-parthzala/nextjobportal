import { Rocket } from "lucide-react";
import { Fragment } from "react";

export default function JobIcon(){
    return(
        <Fragment>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12 mb-4 text-gray-900"
            >
                <path
                    fill-rule="evenodd"
                    d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75"
                    clip-rule="evenodd"
                ></path>
                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05"/>
            </svg> */}
            <Rocket />
        </Fragment>
    )
}