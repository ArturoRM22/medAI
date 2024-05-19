// Disagnostics
import Bar from "@/components/components/header";
import * as React from "react";
import ChatList from "@/components/components/chatlist";
import Navlow from "@/components/components/navlow";
export default function Home() {
  return (
    <div>
       <Bar/>
       <div className="pt-[5rem]">
        <div>
              <ChatList/>
        </div>
        <div>
              <Navlow/>
        </div>
       </div>
    </div>
  );
}