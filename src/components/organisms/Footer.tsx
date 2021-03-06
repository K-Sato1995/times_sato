import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router-dom'
import { User } from 'firebase/auth'

const FooterContainer = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 3.125rem;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-top: solid ${(props) => props.theme.borderColor} 1px;
`

const FooterContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 860px;
  height: 3.125rem;
  font-size: 1.1rem;
  text-align: center;
`

const FooterItem = styled(Link)`
  display: inline-block;
  height: 100%;
  text-decoration: none;
  padding-top: 1rem;
  text-align: center;
  width: 50%;
  color: ${(props) => props.theme.secondaryColor};

  /* :not(:last-child) {
    border-right: solid 1px ${(props) => props.theme.borderColor};
  } */

  ${(props: { active: boolean }) =>
    props.active &&
    css`
      color: ${(props) => props.theme.primaryColor};
      border-top: solid 2px ${(props) => props.theme.primaryColor};
    `}
`

interface Props {
  currentUser?: User | null
}

const Footer = ({ currentUser }: Props) => {
  const location = useLocation()
  const currPath = location.pathname
  return (
    <FooterContainer>
      <FooterContent>
        {currentUser && (
          <>
            <FooterItem
              to={'/logs'}
              active={currPath === '/' || /\/logs/.test(currPath)}
            >
              Logs
            </FooterItem>

            <FooterItem to={'/issues'} active={/\/issues/.test(currPath)}>
              Issues
            </FooterItem>
          </>
        )}
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
