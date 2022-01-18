import { Skeleton } from "@mui/material"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import { PANCAKE_LINK } from "../../config"
import { importToken } from "../hook/ethereum"
import { SidebarButton } from "./styleHook"
import Moralis from "moralis"

export default function Sidebar({ connected, headerAlert, ...props }) {
  const router = useRouter()
  const goto = (url) => {
    router.push(url)
  }
  const [price, setPrice] = useState(1)
  const [loading, setLoading] = useState(false)

  const getPrice = async () => {
    const options = {
      address: "0xc6f82B6922Ad6484c69BBE5f0c52751cE7F15EF2",
      chain: "bsc",
      exchange: "PancakeSwapv2"
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options)
    setPrice(price.usdPrice)
  }

  useEffect(() => {
    const interval_id = setInterval(getPrice, 10000);
    return () => {
      clearInterval(interval_id)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar-content" style={{ paddingTop: !headerAlert ? 70 : 95 }}>
        <ul>
          <li>
            <SidebarButton fullWidth onClick={() => goto("/")}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_32_94)">
                  <path d="M16.9231 9.23077V15C16.9231 15.2083 16.8469 15.3886 16.6947 15.5409C16.5424 15.6931 16.3622 15.7692 16.1538 15.7692H11.5384V11.1538H8.46153V15.7692H3.84615C3.63782 15.7692 3.45753 15.6931 3.30529 15.5409C3.15304 15.3886 3.07692 15.2083 3.07692 15V9.23077C3.07692 9.22276 3.07892 9.21074 3.08293 9.19471C3.08694 9.17869 3.08894 9.16667 3.08894 9.15865L9.99999 3.46154L16.911 9.15865C16.9191 9.17468 16.9231 9.19872 16.9231 9.23077ZM19.6033 8.40144L18.8582 9.29086C18.7941 9.36298 18.7099 9.40705 18.6057 9.42308H18.5697C18.4655 9.42308 18.3814 9.39503 18.3173 9.33894L9.99999 2.40385L1.68269 9.33894C1.58654 9.40304 1.49038 9.43109 1.39423 9.42308C1.29006 9.40705 1.20593 9.36298 1.14183 9.29086L0.396635 8.40144C0.332532 8.32131 0.304488 8.22716 0.3125 8.11899C0.320513 8.01082 0.364584 7.92468 0.444712 7.86058L9.08653 0.661057C9.34294 0.452723 9.64743 0.348557 9.99999 0.348557C10.3526 0.348557 10.657 0.452723 10.9134 0.661057L13.8461 3.11298V0.76923C13.8461 0.65705 13.8822 0.564903 13.9543 0.492787C14.0264 0.420672 14.1186 0.384614 14.2308 0.384614H16.5384C16.6506 0.384614 16.7428 0.420672 16.8149 0.492787C16.887 0.564903 16.9231 0.65705 16.9231 0.76923V5.67308L19.5553 7.86058C19.6354 7.92468 19.6795 8.01082 19.6875 8.11899C19.6955 8.22716 19.6674 8.32131 19.6033 8.40144Z" fill="#DFAE00" />
                </g>
                <defs>
                  <clipPath id="clip0_32_94">
                    <rect width="20" height="15.7692" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Home</span>
            </SidebarButton>
          </li>
          {connected &&
            <li>
              <SidebarButton fullWidth onClick={() => goto("/nfts-list")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66666 6.75V9.25C4.66666 9.66422 4.33087 10 3.91666 10H0.75C0.335781 10 0 9.66422 0 9.25V6.75C0 6.33578 0.335781 6 0.75 6H3.91666C4.33087 6 4.66666 6.33578 4.66666 6.75ZM0 11.75V14.25C0 14.6642 0.335781 15 0.75 15H3.91666C4.33087 15 4.66666 14.6642 4.66666 14.25V11.75C4.66666 11.3358 4.33087 11 3.91666 11H0.75C0.335781 11 0 11.3358 0 11.75ZM3.91666 1H0.75C0.335781 1 0 1.33578 0 1.75V4.25C0 4.66422 0.335781 5 0.75 5H3.91666C4.33087 5 4.66666 4.66422 4.66666 4.25V1.75C4.66666 1.33578 4.33087 1 3.91666 1ZM6.41666 15H15.25C15.6642 15 16 14.6642 16 14.25V11.75C16 11.3358 15.6642 11 15.25 11H6.41666C6.00244 11 5.66666 11.3358 5.66666 11.75V14.25C5.66666 14.6642 6.00244 15 6.41666 15ZM5.66666 1.75V4.25C5.66666 4.66422 6.00244 5 6.41666 5H15.25C15.6642 5 16 4.66422 16 4.25V1.75C16 1.33578 15.6642 1 15.25 1H6.41666C6.00244 1 5.66666 1.33578 5.66666 1.75ZM6.41666 10H15.25C15.6642 10 16 9.66422 16 9.25V6.75C16 6.33578 15.6642 6 15.25 6H6.41666C6.00244 6 5.66666 6.33578 5.66666 6.75V9.25C5.66666 9.66422 6.00244 10 6.41666 10Z" fill="#DFAE00" />
                </svg>
                <span>My NFTs</span>
              </SidebarButton>
            </li>
          }
          <li>
            <SidebarButton fullWidth onClick={() => goto("/faq")}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 8C15.75 12.2812 12.2799 15.75 8 15.75C3.72009 15.75 0.25 12.2812 0.25 8C0.25 3.72134 3.72009 0.25 8 0.25C12.2799 0.25 15.75 3.72134 15.75 8ZM8.20797 2.8125C6.50494 2.8125 5.41875 3.52991 4.56581 4.80494C4.45531 4.97012 4.49228 5.19291 4.65066 5.313L5.735 6.13519C5.89766 6.25853 6.12941 6.22919 6.25578 6.06887C6.81403 5.36081 7.19681 4.95022 8.0465 4.95022C8.68491 4.95022 9.47456 5.36109 9.47456 5.98016C9.47456 6.44816 9.08822 6.6885 8.45788 7.04191C7.72275 7.454 6.75 7.96691 6.75 9.25V9.375C6.75 9.58209 6.91791 9.75 7.125 9.75H8.875C9.08209 9.75 9.25 9.58209 9.25 9.375V9.33334C9.25 8.44391 11.8496 8.40687 11.8496 6C11.8496 4.18744 9.96941 2.8125 8.20797 2.8125ZM8 10.5625C7.20734 10.5625 6.5625 11.2073 6.5625 12C6.5625 12.7926 7.20734 13.4375 8 13.4375C8.79266 13.4375 9.4375 12.7926 9.4375 12C9.4375 11.2073 8.79266 10.5625 8 10.5625Z" fill="#DFAE00" />
              </svg>
              <span>F.A.Q</span>
            </SidebarButton>
          </li>
        </ul>
        <div className="token-info">
          <a
            href="https://twitter.com/DustyVaultsNFT"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <div className="social-icon">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_41_2)">
                  <path d="M19.5991 1.94839C18.8779 2.26816 18.103 2.48427 17.2897 2.5815C18.1199 2.08389 18.7574 1.29591 19.0576 0.357036C18.2683 0.825389 17.4048 1.15537 16.5044 1.33273C15.7709 0.551333 14.726 0.0629883 13.5695 0.0629883C11.349 0.0629883 9.54861 1.86326 9.54861 4.08366C9.54861 4.39884 9.58421 4.70567 9.65273 5.00002C6.3111 4.83229 3.34842 3.2316 1.36526 0.798988C1.01923 1.39283 0.820957 2.08358 0.820957 2.82035C0.820957 4.21533 1.53085 5.44595 2.60967 6.16703C1.97116 6.14703 1.3467 5.97457 0.788422 5.66406C0.788192 5.6809 0.788192 5.69774 0.788192 5.71466C0.788192 7.66276 2.17414 9.28787 4.01345 9.65725C3.42137 9.81827 2.80031 9.84184 2.19772 9.72615C2.70934 11.3235 4.19428 12.486 5.95367 12.5185C4.57759 13.5968 2.84385 14.2397 0.960134 14.2397C0.635541 14.2397 0.315541 14.2206 0.000976562 14.1835C1.78034 15.3243 3.8938 15.99 6.16442 15.99C13.5602 15.99 17.6043 9.86318 17.6043 4.54995C17.6043 4.37556 17.6005 4.20217 17.5927 4.02976C18.3799 3.46072 19.0593 2.7559 19.5991 1.94839" fill="#fff" />
                </g>
                <defs>
                  <clipPath id="clip0_41_2">
                    <rect width="19.6" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span>
              twitter
            </span>
          </a>
          <a
            href="https://t.me/DustyVaults"
            target="_blank"
            rel="noreferrer"
            className="social-link discord"
          >
            <div className="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_45_10)">
                  <path d="M22.0517 2.12925L0.788779 10.3711C-0.0668777 10.7549 -0.356284 11.5235 0.581966 11.9407L6.03681 13.6831L19.2259 5.48986C19.9461 4.9755 20.6833 5.11266 20.0489 5.67849L8.72125 15.9879L8.36542 20.3509C8.695 21.0245 9.29847 21.0277 9.6834 20.6928L12.8174 17.7121L18.1848 21.7521C19.4314 22.494 20.1098 22.0152 20.378 20.6555L23.8985 3.89911C24.2641 2.22544 23.6407 1.488 22.0517 2.12925V2.12925Z" fill="#fff" />
                </g>
                <defs>
                  <clipPath id="clip0_45_10">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span>
              telegram
            </span>
          </a>
          <div>
            <h5>$Dusty</h5>
            <p>
              {loading ?
                <Skeleton width={70} sx={{ bgcolor: '#ffffff20' }} height={40} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />
                :
                <>$ {parseFloat(price).toFixed(3)}</>
              }
            </p>
          </div>
          <a
            href={PANCAKE_LINK}
            target="_blank"
            rel="noreferrer"
            className="buy-link"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 5 }}>
              <path d="M11.6667 1.66663C13.1917 1.6659 14.6708 2.18802 15.8574 3.1459C17.044 4.10378 17.8664 5.43952 18.1873 6.93035C18.5082 8.42118 18.3083 9.97697 17.6209 11.3382C16.9336 12.6995 15.8003 13.784 14.4101 14.4108C13.9657 15.3932 13.2897 16.2532 12.4399 16.917C11.5902 17.5808 10.5922 18.0285 9.53141 18.2219C8.47064 18.4153 7.3788 18.3485 6.34952 18.0272C5.32024 17.7059 4.38425 17.1398 3.62181 16.3774C2.85937 15.6149 2.29325 14.6789 1.97198 13.6497C1.65072 12.6204 1.5839 11.5285 1.77727 10.4678C1.97063 9.407 2.41841 8.40896 3.08219 7.55924C3.74598 6.70953 4.60596 6.0335 5.58838 5.58913C6.11684 4.41987 6.97137 3.42788 8.04951 2.73213C9.12764 2.03639 10.3836 1.66643 11.6667 1.66663V1.66663ZM9.16672 7.49996H7.50005V8.33329C6.95848 8.33198 6.43768 8.5416 6.04804 8.91775C5.6584 9.29389 5.43054 9.80697 5.41277 10.3483C5.395 10.8895 5.58871 11.4165 5.95284 11.8174C6.31697 12.2182 6.82289 12.4616 7.36339 12.4958L7.50005 12.5H9.16672L9.24172 12.5066C9.33779 12.524 9.4247 12.5746 9.48728 12.6495C9.54986 12.7245 9.58415 12.819 9.58415 12.9166C9.58415 13.0143 9.54986 13.1088 9.48728 13.1837C9.4247 13.2587 9.33779 13.3092 9.24172 13.3266L9.16672 13.3333H5.83339V15H7.50005V15.8333H9.16672V15C9.70829 15.0013 10.2291 14.7917 10.6187 14.4155C11.0084 14.0394 11.2362 13.5263 11.254 12.985C11.2718 12.4437 11.0781 11.9168 10.7139 11.5159C10.3498 11.115 9.84388 10.8717 9.30338 10.8375L9.16672 10.8333H7.50005L7.42505 10.8266C7.32898 10.8092 7.24207 10.7587 7.17949 10.6837C7.11691 10.6088 7.08262 10.5143 7.08262 10.4166C7.08262 10.319 7.11691 10.2245 7.17949 10.1495C7.24207 10.0746 7.32898 10.024 7.42505 10.0066L7.50005 9.99996H10.8334V8.33329H9.16672V7.49996ZM11.6667 3.33329C10.9606 3.33247 10.2624 3.48158 9.61824 3.77076C8.97407 4.05994 8.39866 4.48261 7.93005 5.01079C8.87194 4.95362 9.81523 5.09704 10.6976 5.43158C11.5799 5.76612 12.3811 6.28416 13.0483 6.95144C13.7155 7.61872 14.2335 8.42004 14.5679 9.3024C14.9024 10.1848 15.0457 11.1281 14.9884 12.07C15.7461 11.3963 16.2811 10.5083 16.5224 9.52355C16.7637 8.53886 16.7 7.50406 16.3397 6.55639C15.9794 5.60873 15.3396 4.79299 14.505 4.21736C13.6704 3.64173 12.6806 3.33341 11.6667 3.33329V3.33329Z" fill="#fecc1e" />
            </svg>
            <span>BUY <span className="token-name">$DUSTY</span></span>
          </a>
          <button className="add-token" onClick={() => importToken()}>
            <span>Add $Dusty to MetaMask</span>
          </button>
        </div>
      </div>
    </div>
  )
}

