
import React from "react";

export default function Guide() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-2 justify-center overflow-auto">
      
      <div className="flex flex-col justify-start "><img src="/png/btn_O.png" alt="btn O" className="w-[16px] h-[16px]" />
      <div className="btn-text -mt-[1px]">그렇다</div>
      </div>

      <div className="flex flex-col justify-start "><img src="/png/btn_X.png" alt="btn X" className="w-[16px] h-[16px]" />
      <div className="btn-text -mt-[1px]">아니다</div>
      </div>

      <div className="flex flex-col justify-start "><img src="/png/btn_menu.png" alt="btn menu" className="w-[16px] h-[16px]" />
      <div className="btn-text -mt-[1px]">다른 옵션</div>
      </div>

      <div className="flex flex-col justify-start "><img src="/png/btn_-.png" alt="btn -" className="w-[16px] h-[16px]" />
      <div className="btn-text -mt-[1px]">고려 불필요</div>
      </div>

      <div className="flex flex-col justify-start "><img src="/png/btn_....png" alt="btn current" className="w-[16px] h-[16px]" />
      <div className="btn-text -mt-[1px]">잘 모르겠다</div>
      </div>
    </div>
  );
}