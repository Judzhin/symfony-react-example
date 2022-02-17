<?php
/**
 * @access protected
 * @author Judzhin Miles <msbios@gmail.com>
 */

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Trait RestController
 *
 * @package App\Controller
 */
trait RestController
{
    /**
     * @var int HTTP status code - 200 (OK) by default
     */
    protected int $statusCode = Response::HTTP_OK;

    /**
     * Gets the value of statusCode.
     *
     * @return integer
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * Sets the value of statusCode.
     *
     * @param integer $statusCode the status code
     *
     * @return $this
     */
    protected function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    /**
     * Returns a JSON response
     *
     * @param array $data
     * @param array $headers
     *
     * @return JsonResponse
     */
    protected function createResponse(array $data, array $headers = []): JsonResponse
    {
        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    /**
     * Sets an error message and returns a JSON response
     *
     * @param string $errors
     * @param array $headers
     *
     * @return JsonResponse
     */
    protected function respondWithErrors(string $errors, array $headers = []): JsonResponse
    {
        /** @var array $data */
        $data = [
            'status' => $this->getStatusCode(),
            'errors' => $errors,
        ];

        return $this->createResponse($data, $headers);
    }

    /**
     * Sets an error message and returns a JSON response
     *
     * @param string $success
     * @param array $headers
     *
     * @return JsonResponse
     */
    protected function respondWithSuccess(string $success, array $headers = []): JsonResponse
    {
        /** @var array $data */
        $data = [
            'status' => $this->getStatusCode(),
            'success' => $success,
        ];

        return $this->createResponse($data, $headers);
    }

    /**
     * Returns a 401 Unauthorized http response
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondUnauthorized(string $message = 'Not authorized!'): JsonResponse
    {
        return $this
            ->setStatusCode(Response::HTTP_UNAUTHORIZED)
            ->respondWithErrors($message);
    }

    /**
     * Returns a 422 Unprocessable Entity
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondValidationError(string $message = 'Validation errors'): JsonResponse
    {
        return $this
            ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->respondWithErrors($message);
    }

    /**
     * Returns a 404 Not Found
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondNotFound(string $message = 'Not found!'): JsonResponse
    {
        return $this
            ->setStatusCode(Response::HTTP_NOT_FOUND)
            ->respondWithErrors($message);
    }

    /**
     * Returns a 201 Created
     *
     * @param array $data
     *
     * @return JsonResponse
     */
    protected function respondCreated(array $data = []): JsonResponse
    {
        return $this
            ->setStatusCode(Response::HTTP_CREATED)
            ->createResponse($data);
    }

    // this method allows us to accept JSON payloads in POST requests
    // since Symfony 4 doesn’t handle that automatically:

    /**
     * @param Request $request
     * @return Request
     */
    protected function transformJsonBody(Request $request): Request
    {
        /** @var mixed $data */
        $data = json_decode($request->getContent(), true);

        if (null === $data) {
            return $request;
        }

        $request->request->replace($data);

        return $request;
    }
}