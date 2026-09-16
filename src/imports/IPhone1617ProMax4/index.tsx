import svgPaths from "./svg-1lxtmsr4gz";
import imgRectangle3 from "./3aca7e195c91623e5ecc2a5f4fa23abdb39ed33c.png";
import imgRectangle4 from "./fbbecf7f8918f2d32f43cb4569f21ebe5b88cc03.png";
import imgRectangle5 from "./9937be2edc163d8e9563a06792267c6eec997949.png";
import imgRectangle8 from "./b8848cce369f540ff3e7b13d5c0baf28f8559ba0.png";
import imgRectangle7 from "./104617f52baf5c5052c1c681ea00710272ea6b8d.png";
import imgRectangle14 from "./e827396afa611ea3a2fd1ffc92c9013903fe477d.png";
type StatusBarIPhoneProps = {
  className?: string;
  time?: string;
};

function StatusBarIPhone({ className, time = "9:41" }: StatusBarIPhoneProps) {
  return (
    <div className={className || "relative w-[402px]"} data-name="Status bar - iPhone">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-[24px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] h-[22px] items-center justify-center min-w-px pt-[1.5px] relative" data-name="Time">
            <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              {time}
            </p>
          </div>
          <div className="flex-[1_0_0] h-[22px] min-w-px relative" data-name="Levels">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[7px] items-center justify-center pr-px pt-px relative size-full">
                <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-name="Cellular Connection">
                  <svg className="absolute block inset-0 size-full" fill="none" height="12.2264" preserveAspectRatio="none" viewBox="0 0 19.2 12.2264" width="19.2">
                    <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="black" fillRule="evenodd" id="Cellular Connection" />
                  </svg>
                </div>
                <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-name="Wifi">
                  <svg className="absolute block inset-0 size-full" fill="none" height="12.3283" preserveAspectRatio="none" viewBox="0 0 17.1417 12.3283" width="17.1417">
                    <path clipRule="evenodd" d={svgPaths.p18b35300} fill="black" fillRule="evenodd" id="Wifi" />
                  </svg>
                </div>
                <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Frame">
                  <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 27.328 13" width="27.328">
                    <g id="Frame">
                      <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="black" width="24" x="0.5" y="0.5" />
                      <path d={svgPaths.p7a14d80} fill="black" id="Cap" opacity="0.4" />
                      <rect fill="black" height="9" id="Capacity" rx="2.5" width="21" x="2" y="2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[16.67%_17.63%_17.63%_16.67%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="17.7398" preserveAspectRatio="none" viewBox="0 0 17.7398 17.7398" width="17.7398">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p1e763480} fill="#68686B" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p2ee34332} fill="#68686B" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function BitcoinIconsSearchFilled() {
  return (
    <div className="absolute left-[132px] overflow-clip size-[27px] top-[82px]" data-name="bitcoin-icons:search-filled">
      <Group />
    </div>
  );
}

function ClarityHomeSolid() {
  return (
    <div className="absolute left-[49px] size-[26px] top-[856px]" data-name="clarity:home-solid">
      <svg className="absolute block inset-0 size-full" fill="none" height="26" preserveAspectRatio="none" viewBox="0 0 26 26" width="26">
        <g clipPath="url(#clip0_0_18)" id="clarity:home-solid">
          <path d={svgPaths.p4e5bb00} fill="black" id="Vector" />
          <path d={svgPaths.p33839380} fill="black" id="Vector_2" />
          <g id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_0_18">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GardenCheckBoxDoubleFill() {
  return (
    <div className="absolute left-[119px] size-[25px] top-[859px]" data-name="garden:check-box-double-fill-12">
      <svg className="absolute block inset-0 size-full" fill="none" height="25" preserveAspectRatio="none" viewBox="0 0 25 25" width="25">
        <g clipPath="url(#clip0_0_28)" id="garden:check-box-double-fill-12">
          <path d={svgPaths.p1076f800} fill="black" id="Vector" />
          <path d={svgPaths.p20420f80} id="Vector_2" stroke="black" strokeLinecap="round" />
        </g>
        <defs>
          <clipPath id="clip0_0_28">
            <rect fill="white" height="25" width="25" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CodiconAccount() {
  return (
    <div className="absolute left-[334px] size-[27px] top-[856px]" data-name="codicon:account">
      <svg className="absolute block inset-0 size-full" fill="none" height="27" preserveAspectRatio="none" viewBox="0 0 27 27" width="27">
        <g clipPath="url(#clip0_0_16)" id="codicon:account">
          <path d={svgPaths.p21d4780} fill="black" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_16">
            <rect fill="white" height="27" width="27" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BoxiconsMessageBubbleDots() {
  return (
    <div className="absolute left-[256px] size-[37px] top-[853px]" data-name="boxicons:message-bubble-dots">
      <svg className="absolute block inset-0 size-full" fill="none" height="37" preserveAspectRatio="none" viewBox="0 0 37 37" width="37">
        <g id="boxicons:message-bubble-dots">
          <path d={svgPaths.p25850580} fill="black" id="Vector" />
          <path d={svgPaths.p15463000} fill="black" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function CarbonFavorite() {
  return (
    <div className="absolute left-[185px] size-[30px] top-[856px]" data-name="carbon:favorite">
      <svg className="absolute block inset-0 size-full" fill="none" height="30" preserveAspectRatio="none" viewBox="0 0 30 30" width="30">
        <g id="carbon:favorite">
          <path d={svgPaths.p89a780} fill="black" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[22.98%_22.97%_22.97%_22.97%]" data-name="Group">
      <div className="absolute inset-[-3.85%]">
        <svg className="block size-full" fill="none" height="13.9717" preserveAspectRatio="none" viewBox="0 0 13.9728 13.9717" width="13.9728">
          <g id="Group">
            <path d={svgPaths.p2ebdc000} id="Vector" stroke="black" />
            <path d={svgPaths.p22179700} id="Vector_2" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BitcoinIconsVerifyOutline() {
  return (
    <div className="absolute left-[26px] overflow-clip size-[24px] top-[548px]" data-name="bitcoin-icons:verify-outline">
      <Group1 />
      <p className="[word-break:break-word] absolute bottom-1/4 font-['Jaldi:Regular',sans-serif] leading-[normal] left-[95.83%] not-italic right-[-166.67%] text-[16px] text-white top-[29.17%]">ri</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[22.98%_22.97%_22.97%_22.97%]" data-name="Group">
      <div className="absolute inset-[-3.85%]">
        <svg className="block size-full" fill="none" height="13.9717" preserveAspectRatio="none" viewBox="0 0 13.9728 13.9717" width="13.9728">
          <g id="Group">
            <path d={svgPaths.p2ebdc000} id="Vector" stroke="black" />
            <path d={svgPaths.p22179700} id="Vector_2" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BitcoinIconsVerifyOutline1() {
  return (
    <div className="absolute left-[333px] overflow-clip size-[24px] top-[543px]" data-name="bitcoin-icons:verify-outline">
      <Group2 />
      <p className="[word-break:break-word] absolute bottom-1/4 font-['Jaldi:Regular',sans-serif] leading-[normal] left-[95.83%] not-italic right-[-166.67%] text-[16px] text-white top-[29.17%]">ri</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[5.21%_14.56%_8.68%_14.56%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.1944" preserveAspectRatio="none" viewBox="0 0 9.21519 11.1944" width="9.21519">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p20d7e200} fill="#8E8E93" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p2065d920} fill="#8E8E93" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function BasilLocationOutline() {
  return (
    <div className="absolute left-[26px] overflow-clip size-[13px] top-[688px]" data-name="basil:location-outline">
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[5.21%_14.56%_8.68%_14.56%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.1944" preserveAspectRatio="none" viewBox="0 0 9.21519 11.1944" width="9.21519">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p20d7e200} fill="#8E8E93" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p2065d920} fill="#8E8E93" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function BasilLocationOutline1() {
  return (
    <div className="absolute left-[334px] overflow-clip size-[13px] top-[689px]" data-name="basil:location-outline">
      <Group4 />
    </div>
  );
}

export default function IPhone1617ProMax() {
  return (
    <div className="bg-[#fbfaf7] relative size-full" data-name="iPhone 16 & 17 Pro Max - 4">
      <div className="absolute bg-[#2e4a7a] h-[133px] left-0 top-0 w-[440px]" />
      <p className="[word-break:break-word] absolute font-['Irish_Grover:Regular',sans-serif] h-[38px] leading-[normal] left-[15px] not-italic text-[24px] text-white top-[76px] w-[96px]">Jomrork</p>
      <StatusBarIPhone className="absolute h-[60px] left-0 top-0 w-[440px]" />
      <div className="absolute bg-[#f2f2f7] h-[47px] left-[122px] opacity-90 rounded-[25px] top-[71px] w-[297px]" />
      <div className="absolute bg-[#f2f2f7] h-[59px] left-[13px] opacity-90 rounded-[25px] top-[842px] w-[387px]" />
      <BitcoinIconsSearchFilled />
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[27px] leading-[normal] left-[168px] not-italic text-[#8e8e93] text-[16px] top-[82px] w-[181px]">Search by University, Area...</p>
      <p className="[word-break:break-word] absolute font-['JejuGothic:Regular',sans-serif] h-[29px] leading-[normal] left-[14px] not-italic text-[18px] text-black top-[142px] w-[194px]">Accommodation Type</p>
      <div className="absolute h-[99px] left-[18px] opacity-85 rounded-[20px] top-[178px] w-[104px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle3} />
      </div>
      <div className="absolute h-[99px] left-[163px] opacity-85 rounded-[20px] top-[178px] w-[104px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle4} />
      </div>
      <div className="absolute h-[99px] left-[308px] opacity-85 rounded-[20px] top-[178px] w-[104px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle5} />
      </div>
      <p className="[word-break:break-word] absolute font-['JejuGothic:Regular',sans-serif] h-[14px] leading-[normal] left-[29px] not-italic text-[14px] text-white top-[253px] w-[86px]">Apartments</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['JejuGothic:Regular',sans-serif] h-[14px] leading-[normal] left-[360px] not-italic text-[14px] text-center text-white top-[253px] w-[96px]">Shared House</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['JejuGothic:Regular',sans-serif] h-[15px] leading-[normal] left-[calc(50%+2px)] not-italic text-[14px] text-center text-white top-[252px] w-[86px]">Condos</p>
      <ClarityHomeSolid />
      <GardenCheckBoxDoubleFill />
      <CodiconAccount />
      <BoxiconsMessageBubbleDots />
      <CarbonFavorite />
      <div className="absolute h-[188px] left-[325px] rounded-[15px] top-[537px] w-[281px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={imgRectangle8} />
      </div>
      <div className="absolute h-[188px] left-[18px] rounded-[15px] top-[540px] w-[281px]">
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[15px]">
          <img alt="" className="absolute max-w-none object-cover rounded-[15px] size-full" src={imgRectangle7} />
          <img alt="" className="absolute max-w-none object-cover rounded-[15px] size-full" src={imgRectangle7} />
        </div>
      </div>
      <div className="absolute bg-[#ededed] h-[66px] left-[18px] rounded-[15px] top-[663px] w-[281px]" />
      <div className="absolute bg-[#ededed] h-[21px] left-[24px] opacity-60 rounded-[15px] top-[549px] w-[66px]" />
      <div className="absolute bg-[#ededed] h-[21px] left-[333px] opacity-60 rounded-[15px] top-[545px] w-[66px]" />
      <div className="absolute bg-[#ededed] h-[40px] left-[325px] top-[662px] w-[281px]" />
      <div className="absolute bg-[#ededed] h-[66px] left-[325px] rounded-[15px] top-[663px] w-[281px]" />
      <div className="absolute bg-[#ededed] h-[40px] left-[18px] top-[663px] w-[281px]" />
      <BitcoinIconsVerifyOutline />
      <BitcoinIconsVerifyOutline1 />
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] inset-[57.43%_80.45%_41%_11.14%] leading-[normal] not-italic text-[12px] text-white">Verified</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] inset-[57.01%_10.68%_41.42%_80.91%] leading-[normal] not-italic text-[12px] text-white">Verified</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[37px] leading-[normal] left-[28px] not-italic text-[18px] text-black top-[698px] w-[104px]">100$/month</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[37px] leading-[normal] left-[338px] not-italic text-[18px] text-black top-[698px] w-[104px]">100$/month</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[20px] leading-[normal] left-[42px] not-italic text-[#8e8e93] text-[10px] top-[686px] w-[152px]">Toul Kork - 5 min to RUPP</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[30px] leading-[normal] left-[26px] not-italic text-[22px] text-black top-[658px] w-[237px]">Studio Room</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[30px] leading-[normal] left-[334px] not-italic text-[22px] text-black top-[657px] w-[237px]">Studio Room</p>
      <p className="[word-break:break-word] absolute font-['Jaldi:Regular',sans-serif] h-[20px] leading-[normal] left-[349px] not-italic text-[#8e8e93] text-[10px] top-[686px] w-[152px]">Toul Kork - 5 min to RUPP</p>
      <BasilLocationOutline />
      <BasilLocationOutline1 />
      <div className="absolute h-[183px] left-[13px] rounded-[15px] top-[321px] w-[286px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={imgRectangle14} />
      </div>
    </div>
  );
}