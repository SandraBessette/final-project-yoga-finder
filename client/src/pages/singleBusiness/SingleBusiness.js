import React, {useState, useEffect, useCallback} from 'react';
import { useParams, useHistory, Link  } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { BiArrowBack } from "react-icons/bi"; 
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"; 
import { BsChatDots } from "react-icons/bs"; 
import { AiOutlineClockCircle, AiOutlineNodeIndex, AiOutlinePhone } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import Spinner from '../../components/spinner/Spinner';
import IconButton from '../../components/button/IconButton';
import Map from '../../components/map/Map';
import Error from '../error/Error';
import { COLORS, HEADER_HEIGHT } from '../../GlobalStyles';
import { colors, isOpen, currentOpenHours } from '../../api/helper';
import { updateFavorites } from '../../store/reducers/auth/action'
//updateFavorites
const SingleBusiness = ()=>{
    const { authData } = useSelector((state)=>state.auth);   
    const [business, setBusiness] = useState(null);    
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [hoursHidden, setHoursHidden] = useState(true);
    const { id } = useParams();
    const history = useHistory();  
    const dispatch = useDispatch();  

    const handleClick = (e) => { 
        e.preventDefault(); 
        history.push('/');       
      };

    const handleClickHoursButton = (e) =>{
        e.preventDefault();
        setHoursHidden(!hoursHidden); 
    };

    const handleClickFavorites = useCallback((e, id)=>{
        console.log("here");
        e.preventDefault();
        fetch(`/user/favorite/${id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData?.token}`
            }               
        })
        .then((res) => res.json())
        .then((json) => {
            const { status, data, message } = json;            
            if (status === 200) {                
                if (authData?.data?.favorites?.includes(id)) {
                    setBusiness(prevBusiness=>({
                        ...prevBusiness,
                        favoriteTotal: prevBusiness.favoriteTotal - 1
                    }))
                }
                else {
                    setBusiness(prevBusiness=>({
                        ...prevBusiness,
                        favoriteTotal: prevBusiness.favoriteTotal + 1
                    }))
                }
                dispatch(updateFavorites(data));                
                setStatus("idle");                  
            }
            else {
                setStatus("error"); 
                console.log(message);                                    
            }
        })
        .catch((error)=>{               
            setStatus("error");               
        });     
    }, [authData, dispatch]);

    useEffect(() => {  
        setStatus("loading");
        fetch(`/business/${id}`)
          .then((res) => res.json())
          .then((json) => {
            const { status, data} = json;     
            if (status === 200) { 
                console.log(data);
                setBusiness(data);
                setStatus("idle");
            } else {    
                setError(status.toString());     
                setStatus("error");
            }
          })
          .catch((e) => {       
            setStatus("error");
            setError("500");   
          });
      }, [id]);

      if (status ==="error") return <Error type={error}/>; 

    return (
        <Wrapper>
            {status === 'loading' && <Spinner />}
            {status === 'idle' && <>
            <TopWrapper color={colors[business.type].color}>
                <IconButton type={business.type} reverse={true} padding={'5px'} margin='0 40px 0 20px' onclick={handleClick}>
                    <BiArrowBack size={40}/>
                </IconButton>
                <TopContentWrapper >
                    <Title>{business.name}</Title> 
                    <Par>{business.ratingCount === 0 ? 'No rating': '⭐⭐⭐⭐⭐'}</Par>              
                </TopContentWrapper>
            </TopWrapper>
            <MainWrapper>
                <Image fit={business.image[0] ? "cover" : "contain"} src={business.image[0] || '/noYogaImage.jpg'} alt="YogaImage"></Image>
                <TopIconWrapper color={colors[business.type].colorLight}>
                    <IconButton                         
                        disabled={!authData} 
                        onclick={(e)=>handleClickFavorites(e, business._id)} 
                        type={business.type} 
                        padding={'10px'} 
                        margin={'4px 0 5px 0'}
                    >
                        {authData?.data?.favorites?.includes(business._id)? <MdFavorite size={50}/> : <MdFavoriteBorder size={50}/>}
                        {business.favoriteTotal > 0 && 
                            <SpanIcon color={colors[business.type].color}>
                                <p>{business.favoriteTotal}</p>
                            </SpanIcon>
                        }
                    </IconButton>
                    <IconButton type={business.type} padding={'10px'} margin={'0 0 5px 0'}>
                        <BsChatDots size={45}/>
                    </IconButton>                    
                </TopIconWrapper>
                <ContentWrapper>                   
                    <IconWrapper>
                        <Block>
                            <AiOutlineClockCircle size={45} color={COLORS.primary}/>
                            <div>
                                <Hour isOpen={isOpen(business.hours)}>{isOpen(business.hours) ? 'Open': 'Close'} </Hour>
                                <Par>{currentOpenHours(business.hours)}</Par>
                                <ButtonHours onClick={((ev)=>(handleClickHoursButton(ev)))}>
                                    {hoursHidden ? 'More Hours' :' Hide Hours'}
                                </ButtonHours>
                                <HoursWrapper className={hoursHidden && 'expanded'} >
                                    {Object.keys(business.hours).map((day)=>(
                                        <Par key={day}><span>{day.substring(0,3)}</span>
                                            {business.hours[day].type === "Open" ? `${business.hours[day].start} - ${business.hours[day].end}` : "Close"}
                                        </Par>
                                    ))}                            
                                </HoursWrapper>
                            </div>
                        </Block>
                        <Block>
                            <AiOutlinePhone size={45} color={COLORS.primary}/>
                            <Par>{business.phone}</Par>
                        </Block>
                        <Block>
                            <FaMapMarkerAlt size={60} color={COLORS.primary}/>
                            <Par>{business.address.app ? `${business.address.app}, ${business.address.formatted}` :
                            business.address.formatted}</Par>
                        </Block>
                    </IconWrapper>
                    <StyledLink to={`/user/profile/${business.userId._id}`}>
                        <ProfilWrapper>                    
                            <ProfilImage src={business.userId.image || '/user.svg'} atl="userProfile"/> 
                                <p>{business.userId.userName}</p>
                        </ProfilWrapper>
                    </StyledLink>
                    {business.tags.length !==0 && <>
                        <span><strong>tags: </strong></span>
                        {business.tags.map((tag, index)=>(
                            <span key={tag}>{index === business.tags.length - 1 ? tag : `${tag}, ` }</span>
                        ))}
                    </>}
                    <p>{business.description}</p>
                    <a href={business.website} >{business.website}</a>
                    < MapWrapper>
                        <Map lat={business.location.coordinates[1]} lng={business.location.coordinates[0]} type={business.type} />
                    </ MapWrapper>
                </ContentWrapper>
            </MainWrapper>
 
            
            </>}
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
   height: calc(100vh - ${HEADER_HEIGHT}); 

`;

const TopWrapper = styled.div`
    min-height: 100px;
    padding: 10px 0;
    background-color:${(p)=>p.color};
    display: flex;
    color: white;
    align-items: center;
  
`;

const TopContentWrapper = styled.div` 
    margin: 0 auto;
    width: 870px;
    display: flex;
    flex-direction: column;

    
   // justify-content: space-between;
`;

const Title = styled.h1`
    font-weight: 600;
`;

const MainWrapper = styled.div`
    margin: 0 auto;
    max-width: 820px;
`;

const Image = styled.img`
    object-fit: ${(p)=>p.fit};
    width: 100%;
    height: 400px;  
    display: block;

`;
const ContentWrapper = styled.div`
    padding: 10px 20px;
    border: 1px solid ${COLORS.lightGray};

`;

const IconWrapper = styled.div`
   display: flex;
   justify-content: space-evenly;
   align-items: flex-start;
   padding: 10px 0 20px 0;
   margin: 10px 0 20px 0;
   border-bottom: 1px solid ${COLORS.lightGray};     
`;

const TopIconWrapper = styled.div`
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   border: 1px solid ${COLORS.lightGray};    
   border-bottom: none;  
   background-color: ${(p)=>p.color};
`;

const Hour = styled.span`
    color: ${(p=>p.isOpen ? 'green' : 'red')};
    font-weight: 600;
    padding: 0 15px;    
`;

const Block = styled.div`
    flex:1;
    display: flex;
    align-items: flex-start;
`;

const Par = styled.p`
    padding: 5px 15px;
    margin: 0;
`;

const ButtonHours = styled.button`
    padding: 5px 15px;
    background: transparent;
    text-decoration: underline;
    border-color: transparent;
    color: ${COLORS.primary};   
    font-size: 14px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const HoursWrapper = styled.div`
    
    max-height: 400px;
    overflow: hidden;   
    transition: max-height 0.45s ease-in-out;

    & p {
        font-size: 15px;       
    }

    & p span {
        font-weight: bold;
        width: 40px;
        float: left;
        margin-right: 15px;
        text-align: end;
    }

  &.expanded { 
    max-height: 0px;
    }
`;

const SpanIcon = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
   
    top: 60%;
    right: -5px;
    border-radius: 50%; 
    background: ${(p)=> p.color};
    color: white;
    font-size: 11px;
    font-weight: bold;
    width: 21px;
    height: 21px;
  
    & p {
        padding: 0;
        margin: 0;
    }
`;

const ProfilWrapper = styled.div`
    display: flex;

    & p {
        color: ${COLORS.primary}; 
        font-weight: 600;  
    }
`;

const ProfilImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 15px 15px 0;
`;

const MapWrapper = styled.div`
    height: 300px;
    margin: 15px 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export default SingleBusiness;